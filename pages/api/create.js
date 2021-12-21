import { useSession } from "next-auth/client";
import prisma from "../../lib/prisma";
const CC = require('currency-converter-lt')

export default async (req, res) => {
    try {
        const { receiverId, amount, currencyFrom, currencyTo, authenticatedUser } = req.body

        const amountToSend = parseFloat(amount)
        const receiver = parseInt(receiverId)

        //validation of inputs
        if (!receiver || !amountToSend || !currencyFrom || !currencyTo) {
            res.status(400).json({
                "message": "Please Fill All Fields"
            })
            return;
        }
        //minimum amount to send set to 10
        if (amountToSend < 10) {
            res.status(400).json({
                "message": "Minimum amount to send is 10"
            })
            return;
        }

        const accountToSendMoneyTo = await prisma.account.findFirst({
            where: {
                userId: receiver,
                AND: {
                    currency: currencyTo
                }
            },
            select: {
                amount: true
            }
        })
        const accountToChargeMoney = await prisma.account.findFirst({
            where: {
                userId: authenticatedUser.id,
                AND: {
                    currency: currencyFrom
                }
            },
            select: {
                amount: true
            }
        })
        console.log('data')
        //check if amount to send is not greater than the available amount
        if (accountToChargeMoney.amount < amountToSend) {
            res.status(400).json({
                "message": "Insufficient amount to send"
            })
            return;
        }
        //money converter
        let currencyConverter = new CC({ from: currencyFrom, to: currencyTo, amount: parseFloat(amountToSend) });
        let convertedAmount = await currencyConverter.convert()

        // transaction saving
        try {
            console.log(authenticatedUser.name)
            const createQuery = await prisma.transaction.create({
                data: {
                    from: authenticatedUser.name,
                    to: receiver,
                    amount: amountToSend,
                    currencyFrom: currencyFrom,
                    currencyTo: currencyTo
                }
            })
        } catch (error) {
            console.log(error)
        }

        //update sender Amount
        const updatedSenderAmount = accountToChargeMoney.amount - amountToSend

        const updateSenderQuery = await prisma.account.updateMany({
            where: {
                userId: authenticatedUser.id,
                AND: {
                    currency: currencyFrom
                }
            },
            data: {
                amount: updatedSenderAmount
            }
        })
        const updatedReceiverAmount = accountToSendMoneyTo.amount + convertedAmount
        const updateReceiverQuery = await prisma.account.updateMany({
            where: {
                userId: receiver,
                AND: {
                    currency: currencyTo
                }
            },
            data: {
                amount: updatedReceiverAmount
            }
        })

        res.status(200).send({ status: 200, message: "Transaction Done Successfully" })
    } catch (error) {
        res.status(500).json({
            "message": "an Error occured..please try again"
        })
        return;
    }
}
import '../styles/globals.css'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
    return (
        <Provider options={{clientMaxAge:0}} session={pageProps.session}>
            <div>
               <Component {...pageProps }
                />
            </div>  
        </Provider>
      )
}


export default MyApp

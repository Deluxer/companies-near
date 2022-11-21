import { createRoot } from 'react-dom/client'
import App from './App';
import { CompanyNEAR } from './near-company';
import { Wallet } from './near-wallet';

const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })
const companyNear = new CompanyNEAR({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

window.onload = async () => {
  const isSignedIn = await wallet.startUp()
  const ditRoot = createRoot(document.getElementById('root'));

  ditRoot.render(
    <App isSignedIn={isSignedIn} company={companyNear} wallet={wallet} />
  );
}
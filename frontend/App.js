import 'regenerator-runtime/runtime';
import React from 'react';
import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';


export default function App({ isSignedIn, company, wallet }) {
  const [valueFromBlockchain = [], setValueFromBlockchain] = React.useState();

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    company.getCompanies()
      .then( value => {
        setValueFromBlockchain(value)
      })
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }, []);


  if (!isSignedIn) {
    return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()}/>;
  }

  function onSubmitCompany(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const elements = e.target.elements;
    const formData = {};
    for (const { name, value } of elements) {
      if (value) {
        formData[name] = value
      }
    }

    company.setCompany(formData)
      .then(async () => {return company.getCompanies();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  return (
    <>
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
      <main className="container">
        <div className="row">
          <h1>Register company</h1>
          <div className="col-md-6">
            <form onSubmit={onSubmitCompany} className="change">
            <div className='row'>
              <div className='form-group mb-2'>
                <label className='class'>ID: </label>
                <input type="text" className='form-control' name="id"/>
              </div>
              <div className='form-group mb-2'>
                <label>Name</label>
                <input type="text" className='form-control' name="name"/>
              </div>
              <div className='form-group mb-2'>
                <label>Description</label>
                <input type="text" className='form-control' name="description"/>
              </div>
              <div className='d-grid gap-2'>
                <button className='col-12'>
                  <span>Save</span>
                  <div className="loader"></div>
                </button>
              </div>
            </div>
            </form>
          </div>
          <div className="col-md-6">
            {
              valueFromBlockchain.map( company => (
                <div key={company.id}>
                    <div className="class">
                      <label htmlFor="">ID: </label> {company.id}
                    </div>
                    <div className="class">
                      <label htmlFor="">Name: </label> { company.name }
                    </div>
                    <div className="class">
                      <label htmlFor="">Description: </label> { company.description }
                    </div>
                    <hr />
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </>
  );
}

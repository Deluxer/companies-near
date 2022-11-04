use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{log, near_bindgen, env};

#[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Company {
    pub id: u64,
    pub account: String,
    pub name: String,
    pub description: String
}

impl Default for Company {
    fn default() -> Self {
        Company {
            id: 0,
            account: String::from(""),
            name: String::from(""),
            description: String::from("")
        }
    }
}
// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    companies: UnorderedMap<u64, Company>,
}

// Define the default, which automatically initializes the contract
impl Default for Contract{
    fn default() -> Self{
        Self{
            companies: UnorderedMap::new(b"t".to_vec()),
        }
    }
}

impl Company {
    pub fn new(account: String, id: u64, name: String, description: String) -> Self {
        Self {
            id,
            account,
            name,
            description
        }
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    pub fn get_company(&self, id: u64) -> Option<Company> {
        self.companies.get(&id)
    }

    pub fn set_company(&mut self, id:u64, name: String, description: String) {
        let account = env::signer_account_id().to_string();

        log!("Saving company {}", name);
        let company = Company::new(account.clone(), id, String::from(&name), String::from(&description));
        self.companies.insert(&id, &company);

        env::log_str("Company created successfully");
    }

    pub fn get_companies(&self) -> Vec<Company>{
        self.companies.values_as_vector().to_vec()
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::testing_env;

    use super::*;

    const ID: u64 = 0;
    const ACCOUNT: &str = "testcompany.testnet";
    const NAME: &str = "ACME";
    const DESCRIPTION: &str = "ACME la mejor empresa del mundo";


    fn set_context() {
        let mut context = VMContextBuilder::new();
        testing_env!(context.build());

        testing_env!(context
            .signer_account_id(ACCOUNT.parse().unwrap())
            .build());
    }

    #[test]
    pub fn test_set_company() {
        set_context();
        let mut contract = Contract::default();
        
        contract.set_company(ID, String::from(NAME), String::from(DESCRIPTION));
        let c = contract.companies.get(&ID).unwrap();

        assert_eq!(c.id, ID);
        assert_eq!(c.account, ACCOUNT.to_string());
        assert_eq!(c.name, NAME);
        assert_eq!(c.description, DESCRIPTION);
    }
}

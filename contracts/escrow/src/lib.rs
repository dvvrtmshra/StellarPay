#![no_std]

use soroban_sdk::{contract, contractimpl, Env, Symbol};

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    pub fn set(env: Env, value: i128) {
        let key = Symbol::new(&env, "value");
        env.storage().instance().set(&key, &value);
    }

    pub fn get(env: Env) -> i128 {
        let key = Symbol::new(&env, "value");
        env.storage().instance().get(&key).unwrap_or(0)
    }
}

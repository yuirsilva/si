use std::io;

fn main() {
    let mut balance: f32 = 0.0;
    const LIMIT: u32 = 5000;

    loop {
        display_menu();

        let selection = get_input_as_u32();

        match selection {
            // 1 = withdraw
            1 => {
                balance = withdraw(balance);
            }
            // 2 = deposit
            2 => balance = deposit(balance),
            // 3 = see your balance
            3 => check_balance(balance),
            // 4 = limit?
            4 => {
                println!("Your bank limit is {}.", LIMIT);
                println!("");
            }
            // 5 = loan calculation
            5 => loan_calculation(),
            6 => {
                println!("Goodbye!");
                return; // it'll end the loop and exit the program
            }
            _ => println!("Invalid option!"),
        };
    }
}

fn display_menu() {
    println!("Please select an option:");
    println!("========================");
    println!("1. WITHDRAW");
    println!("2. DEPOSIT");
    println!("3. CHECK MY BALANCE");
    println!("4. LIMIT");
    println!("5. LOAN CALCULATION");
    println!("6. QUIT");
    println!("========================");
}

fn get_input_as_f32() -> f32 {
    let mut input = String::new();

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    match input.trim().parse::<f32>() {
        Ok(num) => num,
        Err(_) => {
            println!("Invalid input. Please enter a number.");
            get_input_as_f32()
        }
    }
}

fn get_input_as_u32() -> u32 {
    let mut input = String::new();

    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    match input.trim().parse::<u32>() {
        Ok(num) => num,
        Err(_) => {
            println!("Invalid input. Please enter a number.");
            get_input_as_u32()
        }
    }
}

fn deposit(balance: f32) -> f32 {
    println!("Enter the amount to deposit:");

    let amount = get_input_as_f32();

    balance + amount
}

fn withdraw(balance: f32) -> f32 {
    println!("Enter the amount to withdraw:");

    let amount = get_input_as_f32();

    if amount > balance {
        println!("Insufficient balance!");
        return balance;
    }

    balance - amount
}

fn check_balance(balance: f32) {
    println!("Your balance is: {:.2}", balance);
    println!("");
}

fn loan_calculation() {
    println!("Enter the principal amount:");
    let principal = get_input_as_f32();

    println!("Enter the annual interest rate:");
    let annual_rate = get_input_as_f32();

    println!("Enter the loan duration in months:");
    let months = get_input_as_f32();

    let monthly_rate = (annual_rate / 100.0) / 12.0;
    let numerator = monthly_rate * (1.0 + monthly_rate).powf(months);
    let denominator = (1.0 + monthly_rate).powf(months) - 1.0;
    let monthly_payment = principal * (numerator / denominator);

    println!("Your monthly payment is: {:.2}", monthly_payment);
}

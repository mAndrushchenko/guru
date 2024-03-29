const https = require('node:https');

/**
 * Real World Example for the Command Design Pattern
 *
 * Need: Execute a command to retrieve random information every X seconds
 *
 * Solution: Create an object that has all the information to execute the query
 */

/**
 * The Command interface declares a method for executing a command.
 */
interface Command {
    execute(): void;
}

/**
 * We will use a receiver object to run the business logic
 */
class PrintRandomFactCommand implements Command {
    constructor(protected randomFactDomainServiceReceiver: RandomFactDomainServiceReceiver) {
    }

    public async execute(): Promise<void> {
        const fact = await this.randomFactDomainServiceReceiver.getRandomFact();
        console.info(fact);
    }
}

/**
 * The Receiver class contains all the business logic to retrieve the
 * information
 */
class RandomFactDomainServiceReceiver {
    public getRandomFact(): Promise<string> {
        return new Promise((resolve, reject) => {
            https.get('https://uselessfacts.jsph.pl/api/v2/facts/random', (res) => {
                res.on('data', (d) => {
                    const data = JSON.parse(d);
                    const fact = data.text;
                    resolve(fact);
                });
            }).on('error', (error) => {
                reject(error);
            });
        });
    }
}

/**
 * The Invoker will execute any command every X seconds.
 */
class CommandInvoker {
    constructor(protected command: Command, protected seconds: number = 5) {
    }

    start(): void {
        setInterval(() => {
            this.command.execute();
        },          this.seconds * 1000);
    }
}

/**
 * The client code invokes the command
 */
const randomFactDomainServiceReceiver = new RandomFactDomainServiceReceiver();
const command = new PrintRandomFactCommand(randomFactDomainServiceReceiver);
const commandInvoker = new CommandInvoker(command, 3);

commandInvoker.start();

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');
const { ActionTypes } = require('botframework-schema');

class SuggestedActionsBot extends ActivityHandler {
    constructor() {
        super();

        this.onMembersAdded(async (context, next) => {
            await this.sendWelcomeMessage(context);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMessage(async (context, next) => {
            const text = context.activity.text;

            // Create an array with the valid color options.
            const validColors = ['Employment Documentation', 'Alumni Benefits'];

            // If the `text` is in the Array, a valid color was selected and send agreement.
            // if (validColors.includes(text)) {
            //     await context.sendActivity(`I agree, ${ text } is the best color.`);
            // } else {
            //     await context.sendActivity('Please select a color.');
            // }
            if(text == 'Employment Documentation') {
                
                await context.sendActivity('If you want to raise a request for employment documents such as experiance letter, please drop an email to hr@ubs.com'+'I hope that was useful.');
                // await context.sendActivity('Was this what you were looking for? Type Y=yes or N=no');
                await this.sendSuggestedActions(context,"isOkay");
            } else if(text == 'Alumni Benefits') {
                await context.sendActivity('UBS ALumni Offerings...');
                await this.sendSuggestedActions(context,"isOkay");
                // await stepContext.context.sendActivity('Was this what you were looking for?');
            } else if(text == 'Yes') {
                await context.sendActivity('Glad I was helpful, comeback and chat for any queries. :)');
            } else if(text == 'No') {
                await this.sendSuggestedActions(context,"main")
                
            }
            else {
                await context.sendActivity('Please select an Option.');
            }

            // After the bot has responded send the suggested actions.
            // if(text != 'Yes' || text != 'No') {
            //     await this.sendSuggestedActions(context,"isOkay");
            // }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    /**
     * Send a welcome message along with suggested actions for the user to click.
     * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async sendWelcomeMessage(turnContext) {
        const { activity } = turnContext;

        // Iterate over all new members added to the conversation.
        for (const idx in activity.membersAdded) {
            if (activity.membersAdded[idx].id !== activity.recipient.id) {
                const welcomeMessage = `HI Welcome to UBS Alumni Virtual Assistant` +
                    'I am here to answer your questions. ' +
                    'If I dont have the answer, I will hand you over to one of our HR advisors.';
                await turnContext.sendActivity(welcomeMessage);
                await this.sendSuggestedActions(turnContext,"main");
            }
        }
    }

    /**
     * Send suggested actions to the user.
     * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async sendSuggestedActions(turnContext,choice) {
        if(choice == "main") {
            const cardActions = [
                {
                    type: ActionTypes.PostBack,
                    title: 'Employment Documentation',
                    value: 'Employment Documentation',
                    image: 'https://via.placeholder.com/20/FF0000?text=R',
                    imageAltText: 'R'
                },
                {
                    type: ActionTypes.PostBack,
                    title: 'Alumni Benefits',
                    value: 'Alumni Benefits',
                    image: 'https://via.placeholder.com/20/FFFF00?text=Y',
                    imageAltText: 'Y'
                }
                // },
                // {
                //     type: ActionTypes.PostBack,
                //     title: 'Blue',
                //     value: 'Blue',
                //     image: 'https://via.placeholder.com/20/0000FF?text=B',
                //     imageAltText: 'B'
                // }
            ];
    
            var reply = MessageFactory.suggestedActions(cardActions, 'Please select an option below, The virtual assistant is only in English:');
            await turnContext.sendActivity(reply);
        } else {
            const cardActions = [
                {
                    type: ActionTypes.PostBack,
                    title: 'Yes',
                    value: 'Yes',
                    image: 'https://via.placeholder.com/20/FF0000?text=R',
                    imageAltText: 'R'
                },
                {
                    type: ActionTypes.PostBack,
                    title: 'No',
                    value: 'No',
                    image: 'https://via.placeholder.com/20/FFFF00?text=Y',
                    imageAltText: 'Y'
                }
                // },
                // {
                //     type: ActionTypes.PostBack,
                //     title: 'Blue',
                //     value: 'Blue',
                //     image: 'https://via.placeholder.com/20/0000FF?text=B',
                //     imageAltText: 'B'
                // }
            ];
    
            var reply = MessageFactory.suggestedActions(cardActions, 'Is that what you looking for?');
            await turnContext.sendActivity(reply);
        }
        
    }

}

module.exports.SuggestedActionsBot = SuggestedActionsBot;

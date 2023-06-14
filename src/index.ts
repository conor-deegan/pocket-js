export interface SPEND_BY_CATEGORY {
    INCOME?: boolean;
    INCOME_OTHER?: boolean;
    INCOME_REFUNDS?: boolean;
    BILLS?: boolean;
    CHARITY_AND_GIFTS?: boolean;
    EATING_OUT?: boolean;
    ENTERTAINMENT?: boolean;
    INVESTMENT_AND_SAVINGS?: boolean;
    GENERAL?: boolean;
    GROCERIES?: boolean;
    PERSONAL_CARE?: boolean;
    HOME?: boolean;
    INSURANCE?: boolean;
    OTHER?: boolean;
    SHOPPING?: boolean;
    TRANSPORT?: boolean;
    TRAVEL_AND_HOLIDAY?: boolean;
    FEES_AND_CHARGES?: boolean;
    FINANCES?: boolean;
    TRANSFERS?: boolean;
    SALES?: boolean;
    REFUND?: boolean;
    INSURANCE_SETTLEMENT?: boolean;
    LOAN?: boolean;
    CASH_DEPOSIT?: boolean;
    OTHER_RECURRING?: boolean;
    SAVINGS?: boolean;
    INTEREST?: boolean;
    DIVIDEND?: boolean;
    SALARY?: boolean;
    INVOICE?: boolean;
    RENT?: boolean;
    INVESTMENT?: boolean;
    PENSION?: boolean;
    TAX_REBATE?: boolean;
    GRANT?: boolean;
    RECURRING_BENEFIT?: boolean;
    BENEFIT?: boolean;
    TRANSFER?: boolean;
    UNKNOWN?: boolean;
}

interface PocketProfileTypes {
    BASIC?: boolean;
    BROWSING?: boolean;
    BANKING: {
        OVERVIEW?: boolean;
        SUBSCRIPTIONS?: boolean;
        SPEND_BY_CATEGORY?: SPEND_BY_CATEGORY;
    };
    UTILITIES?: boolean;
}

// Handle sign in
const pocketSignInHanlder = async (
    name: string,
    profileType: PocketProfileTypes
) => {
    try {
        window.postMessage(
            {
                type: 'POCKET_APP',
                body: {
                    event: 'SIGN_IN',
                    width: window.outerWidth,
                    height: window.outerHeight,
                    entityName: encodeURI(name),
                    profileType: encodeURI(JSON.stringify(profileType))
                }
            },
            '*'
        );
    } catch (error) {
        throw new Error(error);
    }
};

// Event emitter
enum PocketEvents {
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'
}

interface IData {
    event: PocketEvents;
    profile: {
        [key: string]: any;
    };
    reason: string;
}

interface IPocketEventHandler {
    _events: { [key: string]: ((_data: IData) => void)[] };
    dispatch: (_event: PocketEvents, _data: IData) => void;
    subscribe: (
        _event: PocketEvents,
        _callback: (_data: IData) => void
    ) => void;
    unsubscribe: (_event: PocketEvents) => void;
}

const pocketEventHandler: IPocketEventHandler = {
    _events: {},
    dispatch(event, data) {
        if (!this._events[event]) return;
        this._events[event].forEach((callback) => callback(data));
    },
    subscribe(event, callback) {
        if (!this._events[event]) this._events[event] = [];
        this._events[event].push(callback);
    },
    unsubscribe(event) {
        if (!this._events[event]) return;
        delete this._events[event];
    }
};

// Event listners
const pocketSetListeners = () => {
    window.addEventListener('message', async (event) => {
        const data: IData = event.data.body;
        if (event.source !== window) {
            return;
        }

        if (!event.data.type) {
            return;
        }

        if (event.data.type !== 'POCKET_EXT') {
            return;
        }

        // send data to application
        pocketEventHandler.dispatch(data.event, data);
    });
};

export {
    pocketEventHandler,
    PocketEvents,
    PocketProfileTypes,
    pocketSetListeners,
    pocketSignInHanlder
};

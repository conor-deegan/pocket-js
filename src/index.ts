enum PocketProfileTypes {
    BASIC = 'BASIC',
    ADV_NEWS = 'ADV_NEWS'
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
                    profileType: encodeURI(profileType)
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
    profile: string;
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

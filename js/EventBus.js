//simple EventBus
export default {

    events: {},

    dispatch: function (eventName, data) {

        if (Array.isArray(this.events[eventName])) {
            this.events[eventName].forEach(cb => cb({type: eventName, data}));
        } else {
            //console.log("no-one is listening to event:", eventName);
        }
    },

    on: function (eventName, callBack) {
        
        if (!Array.isArray(this.events[eventName])) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callBack);
    }

};

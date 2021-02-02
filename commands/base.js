
class BaseCommand {
    constructor() {
        this.cooldownType = CooldownType.NONE;
        this.cooldownInterval = 0;
        this.globalCooldown = 0;
        this.userCooldown = {};
        this.everyoneCanUse = false;
        this.modsCanUse = false;
        this.client = undefined;
        this.sql = undefined;
    }

    /**
     * Pre-handle checks.  Checks for cooldowns and permissions.
     * @param {*} context 
     */
    _check(context) {
        var canUse = false;

        if (context.username === 'maxattcken')
            canUse = true;

        if (this.everyoneCanUse)
            canUse = true;

        if (this.modsCanUse && context.mod)
            canUse = true;
        
        if (this.cooldownType == CooldownType.GLOBAL && this.globalCooldown > 0)
            canUse = false;
        
        if (this.cooldownType == CooldownType.USER && (context.username in this.userCooldown))
            canUse = false;
        
        return canUse;
    }

    /**
     * Post-handle, sets cooldowns if required.
     * @param {*} context 
     */
    _postHandle(context) {
        if (this.cooldownType == CooldownType.GLOBAL)
            this.globalCooldown = this.cooldownInterval;
        
        if (this.cooldownType == CooldownType.USER)
            this.userCooldown[context.username] = this.cooldownInterval;
    }

    /**
     * Runs interval checks to decrement cooldowns
     */
    _interval() {
        if (this.cooldownType == CooldownType.NONE)
            return;
        
        if (this.cooldownType == CooldownType.GLOBAL && this.globalCooldown > 0)
            this.globalCooldown -= 1;
        
        if (this.cooldownType == CooldownType.USER) {
            for (const key in this.userCooldown) {
                this.userCooldown[key] = this.userCooldown[key] - 1;
                if (this.userCooldown[key] <= 0)
                    delete this.userCooldown[key];
            }
        }
    }

    /**
     * Main code fire which should be used in handling commands.
     * @param {String} channel 
     * @param {*} context 
     * @param {Array<String>} args 
     */
    _handle(channel, context, args){
        if (!this._check(context))
            return;
        
        this.handle(channel, context, args);

        this._postHandle(context);
    }

    /**
     * @param {String} channel 
     * @param {*} context 
     * @param {Array<String>} args 
     */
    handle(channel, context, args){}
};

const CooldownType = {
    NONE: 0,
    GLOBAL: 1,
    USER: 2
};

module.exports = { BaseCommand, CooldownType };

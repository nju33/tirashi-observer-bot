const gasProperties: GasProperties = {
    get: (key) => {
        const scriptProperties = PropertiesService.getScriptProperties()

        const value = scriptProperties.getProperty(key)
        if (value == null) {
            throw new Error(
                `The value of the ${key} script property doesn't exist`
            )
        }
        
        return value
    }
}

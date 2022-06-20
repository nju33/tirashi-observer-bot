interface WordActionMessage {
    create: (
        value: string,
        flags: {
            exists: boolean
            active: boolean
        }
    ) => import('type-fest').JsonObject
}

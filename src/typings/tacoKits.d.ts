﻿/**
﻿ *******************************************************
﻿ *                                                     *
﻿ *   Copyright (C) Microsoft. All rights reserved.     *
﻿ *                                                     *
﻿ *******************************************************
﻿ */

interface IKitHelper {
    getTemplateOverrideInfo: (kitId: string, templateId: string) => Q.Promise<TacoKits.ITemplateOverrideInfo>;
    getTemplatesForKit: (kitId: string) => Q.Promise<TacoKits.IKitTemplatesOverrideInfo>;
}

// Typings for taco-kits package
declare module TacoKits {
    // Basic interface for a KitHelper, for mocking purposes
    

    export interface IPluginOverrideInfo {
        name?: string;
        version?: string;
        src?: string;
        platforms?: string;
    }

    export interface IPlatformOverrideInfo {
        version: string;
        src?: string;
    }

    // Metadata-related interfaces
    export interface IPluginOverrideMetadata {
        [pluginId: string]: IPluginOverrideInfo;
    }

    export interface IPlatformOverrideMetadata {
        [platformName: string]: IPlatformOverrideInfo;
    }

    export interface ITemplateOverrideInfo {
        kitId: string;
        templateId?: string;
        templateInfo: ITemplateInfo;
    }

    export interface IKitTemplatesOverrideInfo {
        kitId: string;
        templates: ITemplateOverrideInfo[];
    }

    export interface ITemplateInfo {
        name: string;
        url: string;
    }

    export interface ITemplateMetadata {
        [kitId: string]: {
            [templateId: string]: ITemplateInfo;
        }
    }

    export interface IKitInfo {
        "cordova-cli": string;
        "taco-min"?: string;
        name?: string;
        description?: string;
        releaseNotesUri?: string;
        deprecated?: boolean;
        deprecatedReasonUri?: string;
        default?: boolean;
        plugins?: IPluginOverrideMetadata;
        platforms?: IPlatformOverrideMetadata;
    }

    export interface IKitMetadata {
        [kitId: string]: IKitInfo;
    }

    export interface IPluginInfo {
        name: string;
        description?: string;
        platforms?: string[];
    }

    export interface IPluginMetadata {
        [pluginId: string]: IPluginInfo;
    }

    export interface ITacoKitMetadata {
        plugins?: IPluginMetadata;
        kits: IKitMetadata;
        templates: ITemplateMetadata;
    }

    /**
     *   KitHelper class exports methods for parsing the kit metadata file (TacoKitMetaData.json)
     */
    export class KitHelper {
        public static KitMetadataFilePath: string;
        /**
         *   Initializes resource manager with the locale for resource strings
         */
        public static init(locale: string): void;

        /**
         *   Returns a promise which is either rejected with a failure to parse or find kits metadata file
         *   or resolved with the parsed metadata
         */
        public static getKitMetadata(): Q.Promise<ITacoKitMetadata>;

        /**
         *   Returns a promise which is either rejected with a failure to find the specified kit
         *   or resolved with the information regarding the kit
         */
        public static getKitInfo(kitId: string): Q.Promise<IKitInfo>;

        /**
         *  Returns a promise resolved with the Id of the default kit or rejected with error
         *  Note that the default kit is one with default attribute set to 'true'
         */
        public static getDefaultKit(): Q.Promise<string>;

        /**
         *   Returns a promise resolved by a valid cordova Cli for the kitId
         *   If kitId param is a valid {kitId}, returns the cordova Cli used by the kit with id {kitId}
         *   Otherwise, returns the cordovaCli used by the default kit
         */
        public static getValidCordovaCli(kitId: string): Q.Promise<string>;

        /**
         *  Returns a promise resolved with the platform override info for the kit
         */
        public static getPlatformOverridesForKit(kitId: string): Q.Promise<IPlatformOverrideMetadata>;

        /**
         *  Returns a promise resolved with the plugin override info for the kit
         */
        public static getPluginOverridesForKit(kitId: string): Q.Promise<IPluginOverrideMetadata>;

        /**
         *   Returns a promise resolved by the template override information for the specified kit
         *   If there is an override for {kitId} -> returns the template override info for the {templateId}
         *   Else -> returns the default template information with id {templateId}
         */
        public static getTemplateOverrideInfo(kitId: string, templateId: string): Q.Promise<ITemplateOverrideInfo>;

        /**
         *   Returns a promise resolved with an IKitTemplatesOverrideInfo that contains all the templates for the specified kit (or default kit if none specified)
         */
        public static getTemplatesForKit(kitId: string): Q.Promise<IKitTemplatesOverrideInfo>;
    }

    enum TacoErrorCode {
        TacoKitsExceptionInvalidKit,
        TacoKitsExceptionInvalidTemplate,
        TacoKitsExceptionKitMetadataFileMalformed,
        TacoKitsExceptionKitMetadataFileNotFound,
        TacoKitsExceptionNoCliSpecification,
        TacoKitsExceptionTypescriptNotSupported
    }
}

declare module "taco-kits" {
    export = TacoKits;
}

import { EnumContainerProps } from "../components/EnumSwitchContainer";

export class ValidateConfigs {
    public static validateProps(props: EnumContainerProps): string {
        const message: string[] = [];
        const getInvalidEnumKeys = (attributeEnums: { key: string, caption: string }[]) => {
            const customEnums = props.collection;
            const invalidEnumKeys: string[] = [];

            customEnums.forEach(customEnum => {
                const foundEnums = attributeEnums.filter(value => value.key === customEnum.exclude);
                if (foundEnums.length === 0) {
                    invalidEnumKeys.push(customEnum.exclude);
                }
            });

            return invalidEnumKeys;
        };
        const getEnumValidationMessage = (invalidEnumKeys: string[]): string => {
            if (invalidEnumKeys.length > 0) {
                return ("Invalid enumeration keys on custom markers. " +
                    `${invalidEnumKeys.join(", ")} keys must match with ones specified in the enumeration attribute`);
            }

            return "";
        };

        if (props.editable === "default") {
            const attributeEnums = props.mxObject.getEnumMap(props.name);
            const invalidEnumKeys = getInvalidEnumKeys(attributeEnums);

            message.push(getEnumValidationMessage(invalidEnumKeys));
        }
        return message.join(",");
    }
}

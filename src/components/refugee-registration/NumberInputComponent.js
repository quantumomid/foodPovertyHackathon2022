import { FormLabel, FormControl, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText } from "@chakra-ui/react";

export default function NumberInputComponent({label, identifier, value, valueSetter, hint }) {
    return (
        <FormControl py="6">
            <FormLabel htmlFor={identifier}>{label}</FormLabel>
            <NumberInput 
                id={identifier} name={identifier} bg="white"
                value={value} min={0}
                onChange={(value) => valueSetter(value)}
            >
                <NumberInputField type="number" />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <FormHelperText>
                {hint}
            </FormHelperText>
        </FormControl>
    )
}
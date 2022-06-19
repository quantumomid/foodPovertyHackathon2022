import { Input, FormControl, FormLabel } from "@chakra-ui/react";

export default function DOBInput({ primaryDetails, handlePrimaryDetailsChange }) {

    const getCurrentDateString = () => {
        const currentDate = new Date();
        let day = currentDate.getDate().toString();
        day = day.length === 1 ? `0${day}` : day; // max attribute in HTML date input requires two digits
        let month = String(currentDate.getMonth() + 1); // months are zero indexed
        month = month.length === 1 ? `0${month}` : month; // max attribute in HTML date input requires two digits
        const year = currentDate.getFullYear();
        return `${year}-${month}-${day}`;
    }

    return (
        <FormControl py="10">
            <FormLabel htmlFor="DOB">Date of birth</FormLabel>
            <Input
                id="DOB" name="DOB"
                type="text" placeholder="Select a date" 
                onFocus={(e) => (e.currentTarget.type = "date")}
                max={getCurrentDateString()}
                onBlur={(e) => (e.currentTarget.type = "text")}
                bg="white" rounded="none" fontSize="lg"
                _placeholder={{ color: "#404040" }}
                outline="1px solid #404040"
                value={primaryDetails.DOB}
                onChange={handlePrimaryDetailsChange}
            />
        </FormControl>
    )
}
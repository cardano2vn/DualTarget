type Props = {
    inputString: string;
    numberOfFirstChar?: number;
    numberOfLastChar?: number;
};

const convertString = function ({ inputString, numberOfFirstChar = 4, numberOfLastChar = -6 }: Props): string {
    const firstChars = inputString.slice(0, numberOfFirstChar);
    const lastChars = inputString.slice(numberOfLastChar);
    return firstChars + "...." + lastChars;
};

export default convertString;

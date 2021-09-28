import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useField } from "formik";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  size?: never;
};

export const InputField: React.FC<Props> = ({ label, size, ...rest }) => {
  const [field, { error }] = useField(rest);

  return (
    <FormControl isInvalid={!!error}>
      <label htmlFor={rest.name}>{label}</label>
      <Input {...field} id={field.name} {...rest} />
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

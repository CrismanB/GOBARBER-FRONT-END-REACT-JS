import { ValidationError } from "yup";

interface ErrorsProps {
  [key: string]: string;
}

export default function getValidationErrors(
  error: ValidationError
): ErrorsProps {
  const validationsErrors: ErrorsProps = {};

  error.inner.forEach((error) => {
    validationsErrors[error.path] = error.message;
  });

  return validationsErrors;
}

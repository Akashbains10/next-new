import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Schema, ZodType, ZodTypeDef } from "zod";

export const useHookForm = <
    TFormValues extends Record<string, unknown> = Record<string, unknown>,
    Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
        unknown,
        ZodTypeDef,
        unknown>
>(
    schema: Schema,
    options?: any
) => {
    const methods = useForm({...options, resolver: zodResolver(schema)})
    
    const setValues = (valuesToSet:Partial<TFormValues>) => {
        Object.keys(valuesToSet).forEach(fieldName=> {
            methods.setValue(
                fieldName,
                valuesToSet[fieldName]
            )
        })
    };

    return {methods, setValues}
}
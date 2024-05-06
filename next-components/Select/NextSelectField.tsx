import { Select, SelectItem } from "@nextui-org/react";
import { SetStateAction } from "react";

type SelectOptions = {
    label: string;
    value: string;
}
type SelectProps = {
    options: SelectOptions[],
    setValue: (value: SetStateAction<string>) => void
    defaultSelected?: string[];
    label?: string;
    placeholder?: string;
    className?: string;
    color?: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined;
}

export default function NextSelectField({
    options,
    setValue,
    defaultSelected,
    label,
    placeholder,
    className,
    color
}: SelectProps) {
    return (
        <Select
            label={label}
            placeholder={placeholder}
            className={className}
            color={color ? color : 'primary'}
            selectedKeys={defaultSelected}
            onChange={(e) => setValue(e.target.value)}
        >
            {options.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                    {i.label}
                </SelectItem>
            ))}

        </Select>
    )
}
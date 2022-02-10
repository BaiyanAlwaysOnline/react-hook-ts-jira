import { Select } from "antd";
import React from "react";

type SelectType = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectType, "options" | "value" | "onChange"> {
  value?: string | number | undefined;
  options?: { name: string; id: number }[];
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
}

/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 * @constructor
 */

export const IdSelect = (props: IdSelectProps) => {
  const { options, value, onChange, defaultOptionName, ...restProps } = props;
  return (
    <Select
      onChange={(val) => onChange?.(toNumber(val) || undefined)}
      value={options?.length ? toNumber(value) : 0}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map(({ name, id }) => (
        <Select.Option key={id} value={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

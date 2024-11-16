import { ElementType, HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";

export type IProps<T = HTMLElement> = HTMLAttributes<T>;
export interface IPropsAndAs<T = HTMLElement> extends IProps<T> {
  as?: ElementType;
}
export type IInputProps = InputHTMLAttributes<HTMLInputElement>;
export type ISelectProps = SelectHTMLAttributes<HTMLSelectElement>;
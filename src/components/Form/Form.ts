import Block from "../Block";
import Button from "../Button";
import template from "./form.hbs";
import Field from "../../blocks/Field";
import { validate } from "../../controllers/validate";

interface IFormValidationErrorProps {
    error_message?: string;
}

interface IFormFieldProps {
    input: {
        type: string;
        name?: string;
        id?: string;
        placeholder?: string;
        className?: string;
        events?: {
            focus?: () => void;
            blur?: () => void;
        };
        validation_error?: IFormValidationErrorProps;
    };
}

interface IFormButtonProps {
    label: string;
    events?: {
        click: (e: Event) => void;
    }
    type?: string;
    class?: string;
}

interface IFormProps {
    fields: IFormFieldProps[];
    button?: IFormButtonProps;
    class?: string;
    id?: string;
    events?: {
        submit: (event: Event) => void;
    };
}

export class Form extends Block<IFormProps, HTMLFormElement> {
    init() {
        const form_fields: Field[] = [];
        if (Array.isArray(this.props.fields)) {
            this.props.fields.forEach((field: IFormFieldProps) => {
                form_fields.push(new Field(field));
            });
        }
        this.children.fields = form_fields;

        if(this.props.button) {
            this.children.button = new Button(this.props.button);
        }
    }

    render() {
        return this.compile(template, this.props);
    }

    getValues(): unknown {
        const formData = new FormData(this.element as HTMLFormElement);
        const data_object = {};

        for (const [name, value] of formData) {
            if(validate(name, value.toString()) !== "") {
                return;
            }
            Object.assign(data_object, {[name]: value});
        }
        return data_object;
    }

    reset() {
        (this.element as HTMLFormElement).reset();
    }
}

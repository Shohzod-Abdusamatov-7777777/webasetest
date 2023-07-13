import { h } from "vue";
import { getComponent } from "./ComponentTypes";
import { useFormStore } from "src/stores/FormStore";
import { FieldInterface } from "src/@types/form";
import FormTemplateVue from "./FormTemplate.vue";

const VueForm = (props: { formConfig: FieldInterface[] }) => {
    const { formConfig } = props
    console.log(formConfig, 'form')
    // Setup empty store for form data
    const store = useFormStore();

    formConfig.forEach((field) => {
        switch (field.type) {
            case "checkbox":
                field.modelValue=[]
                return (store.formData[field.name] = []);
            case "radio":
                field.modelValue=null
                return (store.formData[field.name] = "");
            default:
                field.modelValue=null
                return (store.formData[field.name] = "");
        }
    });

    const formFields = formConfig.map((field) => {
        let component = getComponent(field.type);
        return { ...field, component };
    });

    // return the render function
    return h(FormTemplateVue, { formFields });
};

export default VueForm;
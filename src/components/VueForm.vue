<template>
	<FormTemplateVue :formFields="formFields" />
</template>

<script lang="ts" setup>
import { getComponent } from './ComponentTypes';
import { useFormStore } from 'src/stores/FormStore';
import { FieldInterface } from 'src/@types/form';
import FormTemplateVue from './FormTemplate.vue';
import { computed } from 'vue';

const props = defineProps<{ formConfig: FieldInterface[] }>();

console.log(props.formConfig, 'vue form');
// Setup empty store for form data
const store = useFormStore();

const formFields = computed(() =>
	props.formConfig.map((field) => {
		let component = getComponent(field.type);
		let val: any = '';
        if(field.type=='checkbox'){
            val = [];
            store.formData[field.name] = [];

        }else{
            val = null;
				store.formData[field.name] = '';
        }

		return { ...field, modelValue: val, component };
	}),
);
</script>

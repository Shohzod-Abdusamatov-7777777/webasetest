<template>
	<form class="form-template q-col-gutter-sm" @submit.prevent="onSubmit">
        {{ formData }}
		<template v-for="(field, i) in formFields" :key="i">
			<template v-if="field.type == 'select'">
				<Component
					:is="field.component"
					v-model="formData[field.name]"
					v-bind="{ ...field.attrs, ...getComponentFieldMeta(field) }"
					:type="field.type"
					:parentId="formData[field.attrs.parent]"
					:parentKey="field.attrs.parent + '_id'"
					@update:modelValue="
						updateField({
							key: field.name,
							value: formData[field.name],
						})
					"
				/>
			</template>
			<template v-else>
				<Component
					:is="field.component"
					v-model="formData[field.name]"
					v-bind="{ ...field.attrs, ...getComponentFieldMeta(field) }"
					:type="field.type"
					@update:modelValue="
						updateField({
							key: field.name,
							value: formData[field.name],
						})
					"
				/>
			</template>
		</template>
		<div class="flex justify-end">
			<q-btn type="submit" label="Submit" color="primary" unelevated no-caps />
		</div>
	</form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
// Pinia store
import { useFormStore } from 'src/stores/FormStore';
// types
import { FieldInterface } from 'src/@types/form';
// utilities
import { pick } from 'src/utilities/index.ts';

// Expected props from parent
withDefaults(
	defineProps<{
		formFields: FieldInterface[];
	}>(),
	{
		formFields: () => [],
	},
);

function getComponentFieldMeta(field: FieldInterface) {
	return {
		...pick(field, ['name', 'validation', 'type', 'text', 'label']),
	};
}

// Pinia
const store = useFormStore();
const { formData } = storeToRefs(store);
const updateField = (payload: { key: string; value: string }) => {
	store.$patch((state) => {
		// @ts-ignore
		state.formData[payload.key] = payload.value;
	});
};

const onSubmit = () => {
	console.log('submit', formData.value);
};
</script>

<style>
.form-template {
	width: 100%;
}
</style>

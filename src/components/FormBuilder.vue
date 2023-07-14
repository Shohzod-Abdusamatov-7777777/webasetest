<template>
	<Splitpanes class="default-theme">
		<!-- components -->
		<Pane min-size="20">
			<div class="full-height full-width">
				<q-toolbar class="bg-grey-2">
					<q-toolbar-title>Components</q-toolbar-title>
				</q-toolbar>
				<q-separator />
				<q-scroll-area style="height: calc(100vh - 51px); width: 100%">
					<FormComponents @addField="(e) => addField(e)" />
				</q-scroll-area>
			</div>
		</Pane>
		<Pane min-size="20">
			<div class="full-height full-width">
				<q-toolbar class="bg-grey-2">
					<q-toolbar-title>Form settings</q-toolbar-title>
				</q-toolbar>
				<q-separator />
				<q-scroll-area style="height: calc(100vh - 51px); width: 100%">
					<FormSettings ref="settingRef" :formConfig="config" @update:config="(e) => (config = e)" />
				</q-scroll-area>
			</div>
		</Pane>
		<Pane min-size="20">
			<div class="full-height full-width">
				<q-toolbar class="bg-grey-2">
					<q-toolbar-title>Form</q-toolbar-title>
				</q-toolbar>
				<q-separator />
				<q-scroll-area style="height: calc(100vh - 51px); width: 100%">
					<VueForm :formConfig="config" />
				</q-scroll-area>
			</div>
		</Pane>
	</Splitpanes>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

import VueForm from 'src/components/VueForm.vue';
import FormComponents from './FormComponents.vue';
import FormSettings from './FormSettings.vue';
// config
import formConfig from 'src/config/formConfig.json';
// types
import { FieldInterface } from 'src/@types/form';

const settingRef = ref<typeof FormSettings | null>(null);
const config = ref([...(formConfig.map((e) => ({ ...e, id: uuidv4() })) as FieldInterface[])]);

const addField = (field: FieldInterface) => {
	const order = config.value.reduce((maxV, obj) => (maxV >= obj.order ? maxV : obj.order), 0) + 1;
	const newField: FieldInterface = {
		...field,
		order,
		id: uuidv4(),
		attrs: { ...field.attrs, class: 'col-12' },
		name: 'field' + order,
	};
	if (newField.type == 'select') {
		newField.attrs = {
			...newField.attrs,
			options: [
				{
					label: 'Option qoshildi',
					value: 'opt1',
				},
			],
		};
	}
	config.value = [...config.value, newField];
	nextTick(() => {
		settingRef.value?.openSetting(newField);
	});
};
</script>

<style>
.splitpanes__pane {
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
	justify-content: center;
	align-items: center;
	display: flex;
	position: relative;
	background-color: #ffffff !important;
}
</style>

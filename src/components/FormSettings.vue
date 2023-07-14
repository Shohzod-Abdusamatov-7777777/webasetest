<template>
	<div class="form-settings q-pa-md">
		<VueDraggableNext v-model="settings" class="q-col-gutter-y-sm" handle=".handle" @end="endDrag">
			<transition-group>
				<div v-for="(field, i) in settings" :key="i">
					<ComponentCard
						:type="field.type"
						style="box-shadow: none; border-style: dashed; cursor: default"
						@click="openSetting(field)"
					>
						<template #header>
							<q-avatar color="grey-3" text-color="grey">
								{{ field.order }}
							</q-avatar>
							<q-btn
								icon="open_with"
								color="positive"
								round
								unelevated
								class="handle bg-grey-2 text-grey float-right"
								style="cursor: grab"
								@click="removeField(i)"
							></q-btn>
							<q-btn
								icon="close"
								color="negative"
								round
								unelevated
								class="bg-red-2 text-red float-right q-mx-sm"
								@click="removeField(i)"
							></q-btn>
						</template>
						<template #body>
							<q-item-label class="q-pb-sm">
								<q-icon
									:name="field.name ? 'verified' : 'error_outline'"
									:color="field.name ? 'positive' : 'negative'"
								/>
								{{ field.name }}
							</q-item-label>
							<Component
								:is="getComponent(field.type as COMPONENT_MAP_TYPES)"
								:modelValue="['checkbox', 'select'].includes(field.type) ? [] : ''"
								v-bind="{ ...field.attrs }"
								:type="field.type"
								disable
								readonly
							/>
						</template>
					</ComponentCard>
				</div>
			</transition-group>
		</VueDraggableNext>
	</div>

	<!-- dialog -->
	<q-dialog v-model="dialog" position="top" class="full-height">
		<q-card style="width:450px" v-if="selectedField">
			<q-card-section class="q-pa-sm">
				<h6>Settings</h6>
				<q-separator />
			</q-card-section>

			<q-card-section class="q-py-sm row q-col-gutter-sm">
				<div class="col-12">
					<q-item-label class="q-pb-xs">Column Name</q-item-label>
					<q-input outlined v-model="selectedField.name" />
				</div>
				<div class="col-12">
					<q-item-label class="q-pb-xs">Column Label</q-item-label>
					<q-input outlined v-model="selectedField.label" />
				</div>
				<div class="col-12">
					<q-item-label class="q-pb-xs">Column Order</q-item-label>
					<q-input outlined v-model="selectedField.order" />
				</div>
				<div class="col-12">
					<q-item-label class="q-pb-xs">Column with</q-item-label>
					<q-option-group :options="classes" type="radio" v-model="selectedField.attrs.class" />
				</div>
			</q-card-section>

			<q-card-section>
				<q-btn label="Save" @click="saveSettings" outlined color="primary" no-caps class="float-right" />
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts" setup>
import { COMPONENT_MAP_TYPES, getComponent } from './ComponentTypes';
import ComponentCard from 'src/components/Card/ComponentCard.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { FieldInterface } from 'src/@types/form';
import { computed, ref } from 'vue';

const props = defineProps<{ formConfig: FieldInterface[] }>();
const emit = defineEmits(['update:config']);
const classes = [
	{ label: 'col-12', value: 'col-12' },
	{ label: 'col-6', value: 'col-6' },
	{ label: 'col-3', value: 'col-3' },
];
const selectedField = ref<FieldInterface | null>();
const dialog = ref(false);
const settings = computed({
	get: () => props.formConfig,
	set: (v) => {
		emit(
			'update:config',
			v.sort((a, b) => a.order - b.order).map((e, i) => ({ ...e, order: i + 1 })),
		);
	},
});

const endDrag = ({ newIndex, oldIndex }: { newIndex: number; oldIndex: number }) => {
	const list = [...settings.value];
	list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
	list.forEach(function (item, index) {
		item.order = index;
	});
	settings.value = [...list];
};

const removeField = (i: number) => {
	settings.value.splice(i, 1);
};

const openSetting = (field: FieldInterface) => {
	selectedField.value = {...field};
	dialog.value = true;
};


const saveSettings=()=>{
	dialog.value=false
	console.log(selectedField.value)
}
</script>

<style>
.form-settings {
	background-image: radial-gradient(#f1f1f1 1px, transparent 0);
	background-size: 20px 20px;
	min-height: calc(100vh - 51px);
}
</style>

<template>
	<div class="row q-col-gutter-sm">
		<q-input label="Search" v-model="search" clearable outlined dense class="col-12">
			<template #prepend>
				<q-icon name="search" />
			</template>
		</q-input>

		<div v-for="(comp, i) in componentFilter" :key="i" class="col-6">
			<ComponentCard :type="comp.type">
				<template #body>
					<Component
						:is="getComponent(comp.type as COMPONENT_MAP_TYPES)"
						:modelValue="['checkbox', 'select'].includes(comp.type) ? [] : ''"
						v-bind="{ ...comp.attrs }"
						:type="comp.type"
					/>
				</template>
			</ComponentCard>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { COMPONENT_MAP_TYPES, getComponent } from './ComponentTypes';
import components from 'src/config/components.json';
import ComponentCard from 'src/components/Card/ComponentCard.vue';

const search = ref('');
const componentFilter = computed(() =>
	search.value ? components.filter((e) => e.type.includes(search.value)) : components,
);
</script>

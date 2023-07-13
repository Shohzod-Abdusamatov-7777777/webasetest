<template>
	<q-card class="comp-card">
		<q-card-section class="q-py-none">
			<q-avatar color="grey-3" text-color="grey" icon="grid_view" />
		</q-card-section>
		<q-card-section class="q-py-sm">
            <q-item-label class="text-h6 q-pb-sm">{{ type }}</q-item-label>
			<slot name="component"></slot>
		</q-card-section>
	</q-card>
</template>

<script lang="ts" setup>
defineProps<{ type: string }>();
</script>

<style lang="scss">
.comp-card {
	padding: 0.75rem;
	box-shadow: 0 0 0.5rem #f4f2f2;
	background: #fff;
	border-radius: 0.4rem;
	border: 1px solid #e5e5e5;
	transition: 0.3 all;
	cursor: grab;
	&:hover {
		border: 1px solid #bdbdbd;
		box-shadow: 0 0 0.5rem #e5e5e5;
	}
}
</style>

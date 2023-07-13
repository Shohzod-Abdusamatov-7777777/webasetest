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
					<FormComponents class="q-pa-md" />
				</q-scroll-area>
			</div>
		</Pane>
		<Pane min-size="20"> </Pane>
		<Pane min-size="20">
			<div class="full-height full-width">
				<q-toolbar class="bg-grey-2">
					<q-toolbar-title>Forma</q-toolbar-title>
				</q-toolbar>
				<q-separator />
				<q-scroll-area style="height: calc(100vh - 51px); width: 100%">
					<VueForm :formConfig="formConfig" class="q-pa-md" />
				</q-scroll-area>
			</div>
		</Pane>
	</Splitpanes>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

import VueForm from 'src/components/VueForm';
import formConfig from 'src/config/formConfig.json';
import FormComponents from './FormComponents.vue';
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

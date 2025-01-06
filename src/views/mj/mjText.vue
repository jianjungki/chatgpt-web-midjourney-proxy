<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MjText',
	props: {
		text: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			localText: '' as string
		}
	},
	methods: {
		handleInput(event: Event): void {
			const target = event.target as HTMLInputElement
			this.localText = target.value
		}
	}
})
</script>

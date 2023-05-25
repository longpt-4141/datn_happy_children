export const countReadMinutes = (count_word) => {
	if (count_word < 200) {
		return 1;
	}
	if (count_word >= 200) {
		return (count_word/200).toFixed();
	}
}
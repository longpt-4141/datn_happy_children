export const shallowEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }

    return true;
}

export const compareTwoArrayOfObjects = (
    first_array_of_objects,
    second_array_of_objects
) => {
    return (
        first_array_of_objects.length === second_array_of_objects.length &&
        first_array_of_objects.every((element_1) =>
            second_array_of_objects.some((element_2) =>
                Object.keys(element_1).every((key) => element_1[key] === element_2[key])
            )
        )
    );
};

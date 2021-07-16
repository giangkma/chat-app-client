import * as _ from 'lodash';

export function removeElementFromArray(array: string[], element: string): void {
    _.remove(array, function(e) {
        return e === element;
    });
}

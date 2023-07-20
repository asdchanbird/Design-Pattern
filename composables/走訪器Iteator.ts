// 簡單list
// class SimpleList {
//     private index: number = 0
//     private size: number = 0
//     private carList: string[] = new string[1000]
    
//     add(car: string) {
//         this.carList[this.size] = car
//         this.size ++
//     }

    
// }


// class SimpleIterator {
//     hasNext(): boolean {
//         if( this.index >= this.size) {
//             return false
//         }
//         return true
//     }
//     next(): string {
//         if (this.hasNext()) {
//             return carList[index++]
//         }
//     }
// }
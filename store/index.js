let clickCount = 0
let even = false
let cardFirst = 0
let cardFirstFull = 0

// sleep function を用いてn秒後に処理を実行する
const sleep = (waitSeconds, someFunction) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(someFunction())
    }, waitSeconds * 1000)
  })
}
const hello = () => console.log('hello')
sleep(1, hello)

export const state = () => ({
  rooms: JSON.parse(localStorage.trump_data || '[]')
})

export const plugins = [
  (store) => {
    store.subscribe(() => {
      localStorage.trump_data = JSON.stringify(store.state.rooms)
    })
  }
]

export const mutations = {
  addRoom(state, room) {
    state.rooms = [...state.rooms, room]
  },
  openCard(state, { roomId, src, num, opened }) {
    // console.log(num)
    clickCount++
    if (clickCount % 2 === 0) {
      even = true
      setTimeout(() => {
        console.log(state.rooms[0].cards[0].src)
        // state.rooms[0].cards[0].src = '/_nuxt/assets/z01.gif'
        opened = false
        console.log(state.rooms[0].cards[0].src)
        console.log('裏返す')
      }, 500)
    } else {
      even = false
    }
    console.log('固定番号', num)
    state.rooms = state.rooms.map((room, i) => {
      if (i === roomId) {
        let cardNum = num
        if (cardNum <= 13) {
          // cardNum
        } else if (cardNum >= 14 && cardNum <= 26) {
          cardNum = cardNum % 13
        } else if (cardNum >= 27 && cardNum <= 39) {
          cardNum = cardNum % 26
        } else if (cardNum >= 40 && cardNum <= 52) {
          cardNum = cardNum % 39
        }
        console.log('１から１３まで', cardNum)
        return {
          cards: room.cards.map((card) => {
            const checkCardTrue = () => card.src === src ? { ...card, opened: true } : card
            const checkCardFalse = () => card.src === src ? { ...card, opened: false } : card

            if (even === false) {
              console.log('1枚目')
              cardFirst = cardNum
              cardFirstFull = num
            }
            if (even === true) {
              console.log('2枚目')
              if (cardFirst === cardNum) {
                if (cardFirstFull !== num) {
                  console.log('当たり！ここで２枚を削除する')
                } else {
                  console.log('同じカードは選べません')
                  console.log(opened)
                  return checkCardFalse()
                }
              }
              // return checkCardFalse()
            }
            return checkCardTrue()
          })
        }
      } else {
        return room
      }
    })
  }
}

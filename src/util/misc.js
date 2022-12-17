import {pluck} from "ramda"
import {debounce} from 'throttle-debounce'
import Fuse from "fuse.js/dist/fuse.min.js"

export const fuzzy = (data, opts = {}) => {
  const fuse = new Fuse(data, opts)

  // Slice pattern because the docs warn that it"ll crash if too long
  return q => (q ? pluck("item", fuse.search(q.slice(0, 32))) : data)
}

export const hash = s =>
  Math.abs(s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0))

export const getLocalJson = k => {
  try {
    return JSON.parse(localStorage.getItem(k))
  } catch (e) {
    return null
  }
}

export const setLocalJson = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch (e) {
    // pass
  }
}

export const now = () => Math.round(new Date().valueOf() / 1000)

export const timedelta = (n, unit = 'seconds') => {
  switch (unit) {
    case 'seconds': return n
    case 'minutes': return n * 60
    case 'hours': return n * 60 * 60
    case 'days': return n * 60 * 60 * 24
    default: throw new Error(`Invalid unit ${unit}`)
  }
}

export const formatTimestamp = ts => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return formatter.format(new Date(ts * 1000))
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const createScroller = loadMore => {
  const onScroll = debounce(1000, async () => {
    /* eslint no-constant-condition: 0 */

    while (true) {
      // While we have empty space, fill it
      const {scrollY, innerHeight} = window
      const {scrollHeight} = document.body

      if (scrollY + innerHeight + 600 < scrollHeight) {
        break
      }

      loadMore()

      await sleep(1000)
    }
  })

  onScroll()

  return onScroll
}

export const randomChoice = xs => xs[Math.floor(Math.random() * xs.length)]

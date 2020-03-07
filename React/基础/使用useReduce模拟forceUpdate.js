const [ignored, forceUpdate] = useReduce(x => x + 1, 0)

function handleClick() {
  forceUpdate()
}

import Hex from '../../hex'

export default {
    render(hexes) {
        const style = {
            position: 'absolute',
            width: Hex.prototype.width(),
            height: Hex.prototype.height()
        }
        const fragment = document.createDocumentFragment()

        hexes.forEach(hex => {
            const hexNode = stringToDOMNodes(hex.element())[0]
            const hexOffset = this.origin.add(hex.toPoint())

            Object.assign(hexNode.style, style, {
                left: hexOffset.x,
                top: hexOffset.y
            })

            fragment.appendChild(hexNode)
        })

        this.container.appendChild(fragment)
        return this
    }
}

// privates

function stringToDOMNodes(string) {
    const div = document.createElement('div')
    div.innerHTML = string.trim()
    return div.childNodes
}

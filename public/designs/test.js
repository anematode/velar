/* global Grapheme, React, ReactDOM */

class Equation extends React.Component {
  render () {}
}

class EquationList extends React.Component {
  constructor (props) {
    super(props)

    this.equations = []
    this.state = { equationCount: 0 }
  }

  addEquation () {
    this.equations.push()
  }

  render () {
    return (
      <section className='equations-wrapper'>
        <div className='logo-space' />
        <ul className='equations'>
          <Equation />
        </ul>
        <div className='add-equation'>
          <span className='add-equation-label'>
            Add ...
            <span className='flex' />
            <span className='icon' data-octicon='plus' />
          </span>
          <div className='add-equation-wrapper'>
            <div className='add-equation-dialog' role='group'>
              <button className='add-type'>
                <span className='icon' data-octicon='graph' />
                Graph
              </button>
              <button className='add-type'>
                <span className='icon' data-octicon='note' />
                Note
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class VelarMenu extends React.Component {
  render () {
    return (
      <div className='mobile-menu-wrapper'>
        <div className='logo-wrapper'>
          <button className='menu-btn icon-btn' id='_temp-open-menu-btn'>
            <span className='icon' data-octicon='three-bars'>
              Open menu
            </span>
          </button>
          <button className='close-menu-btn icon-btn' id='_temp-close-menu-btn'>
            <span className='icon' data-octicon='x'>
              Close menu
            </span>
          </button>
          <img src='./logos/draft-2.svg' alt='Velar logo' className='logo' />
        </div>
        <aside className='menu'>Idk what the menu will have</aside>
        <nav className='tabs'>
          <button className='tab active'>Graph</button>
        </nav>
      </div>
    )
  }
}

class GraphemePlot extends React.Component {
  resize () {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect()

    plot.setSize(rect.width, rect.height)
  }

  componentDidMount () {
    const domNode = ReactDOM.findDOMNode(this)
    domNode.appendChild(plot.domElement)

    this.resizeListener = () => this.resize()

    domNode.addEventListener('resize', this.resizeListener)
    window.addEventListener('load', this.resizeListener)
  }

  componentWillUnmount () {
    const domNode = ReactDOM.findDOMNode(this)

    domNode.removeEventListener('resize', this.resizeListener)
    window.removeEventListener('load', this.resizeListener)
  }

  render () {
    return (
      <div className='grapheme-wrapper' id='_temp-grapheme-wrapper'>
        <button className='settings-btn icon-btn' id='_temp-settings-btn'>
          <span className='icon' data-octicon='gear'>
            Graphing settings
          </span>
        </button>
        <div className='settings-wrapper'>
          What settings should Grapheme have here? Can't have too many, or it'll
          be overwhelming.
          <br />
          Actually, what'd be cool is if there could be a demo for each option,
          so students can learn what each option does and is meant for.
          <br />
          Not sure how helpful that'd be.
        </div>
      </div>
    )
  }
}

class VelarApp extends React.Component {
  constructor (props) {
    super(props)

    this.plot = new Grapheme.Plot2D()
  }

  render () {
    return (
      <>
        <VelarMenu />
        <main className='main'>
          <EquationList plot={this.plot} />
          <div className='resize-equations' />
          <GraphemePlot plot={this.plot} />
        </main>
      </>
    )
  }
}

const domContainer = document.getElementById('main-wrapper')
const app = <VelarApp />

const plot = new Grapheme.Plot2D()
const gridlines = new Grapheme.Gridlines()

gridlines.pens.axis.thickness = 2
plot.add(gridlines)

function render () {
  plot.render()
  window.requestAnimationFrame(render)
}

const params = new URL(window.location).searchParams

const theme = params.get('theme') || 'dark'
if (theme !== 'dark') {
  document.body.classList.replace('dark', theme)
}

function setTheme ({ text, background, axisColour, gridColour, font }) {
  gridlines.label_style.color = text
  gridlines.label_style.shadowColor = background
  gridlines.label_style.fontFamily = font

  gridlines.pens.box.visible = false
  gridlines.pens.axis.color = axisColour
  gridlines.pens.major.color = gridColour
  gridlines.pens.minor.color = gridColour
}
const themes = {
  dark () {
    // Would like to use the computed CSS properties for these values, I think
    // Might be nice if Grapheme had a helper function for making a Color from a CSS string?
    return {
      text: Grapheme.rgba(255, 255, 255, 0.8 * 255),
      background: Grapheme.rgba(19, 20, 29),
      axisColour: Grapheme.rgba(255, 255, 255, 0.5 * 255),
      gridColour: Grapheme.rgba(255, 255, 255, 0.3 * 255),
      font: '"Source Sans Pro", sans-serif'
    }
  },
  paper () {
    // Would like to use the computed CSS properties for these values, I think
    // Might be nice if Grapheme had a helper function for making a Color from a CSS string?
    return {
      text: Grapheme.Colors.BLACK,
      background: Grapheme.Colors.WHITE,
      axisColour: Grapheme.Colors.BLACK,
      gridColour: Grapheme.rgba(0, 0, 0, 0.2 * 255),
      font: '"Source Sans Pro", sans-serif'
    }
  }
}

for (const side of Object.keys(plot.padding)) {
  plot.padding[side] = 0
}

if (themes[theme]) setTheme(themes[theme]())
render()

ReactDOM.render(app, domContainer)

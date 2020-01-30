export default interface constantStyle {
    font_size: '1.0rem' | '1.2rem' | '1.4rem' | '1.8rem' | '2.4rem'
    font_weight: 'bold'
    text_align: 'center' | 'left' | 'right'
    position: 'fixed' | 'absolute' |'static'
    display: 'flex' | 'inline-block' | 'block'
    justify_content: 'center' | 'space-between' | 'space-around' | 'left' | 'right'
    align_items: 'center' | 'flex-end'
    flex_direction: 'column' | 'row' | 'column-reverse' | 'row-reverse'
    flex_wrap: 'wrap' | 'wrap-reverse'
    bgColor: "#fff" | '#F9F9F9' | '#DB7093' | '#42b72a' | "#bf87c1" | '#812990' | 'rgba(0,0,0,0.7)' | '#FFFFFF' | '#FFEEFF'
}
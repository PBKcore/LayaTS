module sysui {
    // 系统默认UI，便于写工具。主要自动设定皮肤等通用属性
    import Layout = sear.ui.Layout;
    import Image = sear.ui.Image;
    import ImageLabel = sear.ui.ImageLabel;
    import Label = sear.ui.Label;
    import HtmlLabel = sear.ui.HtmlLabel;
    import InputLabel = sear.ui.InputLabel;
    import Button = sear.ui.Button;
    import StateButton = sear.ui.StateButton;
    import ScrollPanel = sear.ui.ScrollPanel;
    import ProgressBar = sear.ui.ProgressBar;
    import ComboBox = sear.ui.ComboBox;

    export const font: string = "Arial";
    export const size: number = 12;

    export function getImage(width: number, height: number): Image {
        let image: Image = new Image();
        image.width = width;
        image.height = height;
        // image.skin = "";
        // image.sizeGrid = "";
        return image;
    }

    export function getImageLabel(width: number, height: number): ImageLabel {
        let imageLabel: ImageLabel = new ImageLabel();
        imageLabel.width = width;
        imageLabel.height = height;
        imageLabel.skin = "res/default/ui/imglab/jingyan/0.png";
        imageLabel.align = Layout.ALIGN_LEFT;
        imageLabel.valign = Layout.VALIGN_TOP;

        // imageLabel.text = "";
        return imageLabel;
    }

    export function getLabel(width: number, height: number): Label {
        let label: Label = new Label();
        label.width = width;
        label.height = height;
        label.font = font;
        label.fontSize = size;
        label.color = "#000000";
        // label.bold = false;
        // label.italic = false;
        // label.underline = false;
        // label.underlineColor = "";
        // label.align = "";
        // label.valign = "";
        // label.padding = "";
        // label.wordWrap = false;
        // label.leading = 0;

        // label.stroke = 1;
        // label.strokeColor = "";

        // label.bgColor = "";
        // label.borderColor = "";

        // label.overflow = "";

        // label.text = "";
        return label;
    }

    export function getHtmlLabel(width: number, height: number): HtmlLabel {
        let htmlLabel: HtmlLabel = new HtmlLabel();
        htmlLabel.width = width;
        htmlLabel.height = height;
        // htmlLabel.align = "";
        // htmlLabel.valign = "";
        // htmlLabel.padding = [];
        // htmlLabel.leading = 0;

        // htmlLabel.stroke = 1;
        // htmlLabel.strokeColor = "";

        // htmlLabel.bgColor = "";
        // htmlLabel.borderColor = "";

        // htmlLabel.password = false;

        // htmlLabel.text = "";
        return htmlLabel;
    }

    export function getInputLabel(width: number, height: number): InputLabel {
        let inputLabel: InputLabel = new InputLabel();
        inputLabel.width = width;
        inputLabel.height = height;
        inputLabel.font = font;
        inputLabel.fontSize = size;
        inputLabel.color = "#000000";
        inputLabel.borderColor = "#000000";
        // inputLabel.bgx = -6;
        // inputLabel.skin = "res/default/ui/label/input/13,13,13,13.png";
        // inputLabel.sizeGrid = "13,13,13,13";

        inputLabel.promptColor = "#949494";
        // inputLabel.prompt = "";

        // inputLabel.multiline = false;
        // inputLabel.editable = true;
        // inputLabel.restrict = "";
        // inputLabel.maxChars = 10;

        // inputLabel.asPassword = false;

        // label
        return inputLabel;
    }

    export function getButton(width: number, height: number): Button {
        let button: Button = new Button();
        button.width = Math.max(82, width);
        button.height = height;
        button.skin = "res/default/ui/btn/btn_k-1/1_0,36,0,36.png";
        button.stateNum = 1;
        button.sizeGrid = "0,36,0,36";
        button.clickFeedback = 1;
        button.labelFont = font;
        button.labelSize = size;
        button.labelColors = "#ffffff,#ffffff,#ffffff,#ffffff";
        // button.label = "";
        // button.labelBold = false;
        // button.labelPadding = "";
        // button.labelAlign = Layout.ALIGN_CENTER;
        // button.labelStroke = 1;
        // button.labelStrokeColor = "";
        // button.strokeColors = "";
        // button.toolTip = "";
        return button;
    }

    export function getStateButton(width: number, height: number): StateButton {
        let button: StateButton = new StateButton();
        button.width = width;
        button.height = height;
        button.group = 1;
        button.toggle = false;
        return button;
    }

    export function getVScrollPanel(width: number, height: number): ScrollPanel {
        let bar: ScrollPanel = new ScrollPanel();
        bar.width = width;
        bar.height = height;
        bar.vScrollBarSkin = "res/default/ui/touming.png";
        bar.vScrollBar.showButtons = false;
        bar.vScrollBar.sizeGrid = "0,0,0,0";
        
        return bar;
    }

    export function getProgressBar(width: number, height: number): ProgressBar {
        let bar: ProgressBar = new ProgressBar();
        bar.skin = "";
        bar.sizeGrid = "";

        return bar;
    }

    export function getComboBox(width: number, height: number): ComboBox {
        let comboBox: ComboBox = new ComboBox();
        comboBox.width = width;
        comboBox.height = height;

        return comboBox;
    }
}
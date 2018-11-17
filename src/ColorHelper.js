import but_add_b from "./icon/add_black.png";
import but_add_w from "./icon/add_white.png";
import but_help_b from "./icon/help_black.png";
import but_help_w from "./icon/help_white.png";
import but_reload_b from "./icon/reload_black.png";
import but_reload_w from "./icon/reload_white.png";
import but_android_b from "./icon/android_black.png";
import but_android_w from "./icon/android_white.png";

export class ColorHelper {
    static icons = {
        "add": [but_add_b, but_add_w],
        "help": [but_help_b, but_help_w],
        "reload": [but_reload_b, but_reload_w],
        "android": [but_android_b, but_android_w]
    };

    static getColor(id) {
        return "#" + id;
    }

    static getIcon(index, id) {
        if (ColorHelper.isBright(id)) {
            return this.icons[index][0];
        } else {
            return this.icons[index][1];
        }
    }

    static isBright(id) {
        const brightnessEdge = 1000;

        const r = parseInt(id.substr(0, 1), 16);
        const g = parseInt(id.substr(2, 3), 16);
        const b = parseInt(id.substr(4, 5), 16);

        const idBrightness = r + g + b;

        return (idBrightness > brightnessEdge);
    }

    static getBrightClass(id){
        if (this.isBright(id)){
            return "bright";
        }else {
            return "dark"
        }
    }

    static getBackgroundColor(id) {
        const colorBrightnessPercentage = 30;

        let r = parseInt(id.substr(0, 2), 16);
        let g = parseInt(id.substr(2, 2), 16);
        let b = parseInt(id.substr(4, 2), 16);

        r = Math.floor(r * colorBrightnessPercentage / 100);
        g = Math.floor(g * colorBrightnessPercentage / 100);
        b = Math.floor(b * colorBrightnessPercentage / 100);

        r = (r < 255) ? r : 255;
        g = (g < 255) ? g : 255;
        b = (b < 255) ? b : 255;

        const hR = ((r.toString(16).length === 1) ? "0" + r.toString(16) : r.toString(16));
        const hG = ((g.toString(16).length === 1) ? "0" + g.toString(16) : g.toString(16));
        const hB = ((b.toString(16).length === 1) ? "0" + b.toString(16) : b.toString(16));

        return "#" + hR + hG + hB;
    }
}
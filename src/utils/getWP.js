export const getMenu = (value, defaultValue = []) => {
    let result,
        menuArr = [];

    if (Array.isArray(value)) {
        value.forEach((item) => {
            const formatItem = {
                title: item.title.rendered,
                url: getUrl(item.url),
                target: item.target,
                menu_order: item.menu_order,
                sub_menu: [],
            };
            if (item.parent === 0) {
                menuArr[item.id] = formatItem;
            } else {
                if (menuArr?.[item.parent]) {
                    menuArr[item.parent].sub_menu.push(formatItem);
                }
            }
        });
        result = menuArr
            .filter(Boolean)
            .sort((a, b) => a.menu_order - b.menu_order)
            .slice(1); // loại trang chủ
    }

    return result === undefined ? defaultValue : result;
};

const getUrl = (value) => {
    const result = `${value}`.match(/(?<=\/)(.*?)(?=\/)/g);
    return result.length === 0 ? "/#" : "/" + result[result.length - 1];
};

// update:
function(instance, properties, context) {
    const i = instance,
          c = context,
          data = i.data,
          publish = i.publishState,
          trigger = i.triggerEvent,
          valueChanged = data.valueChanged,
          setListeners = data.setListeners,
          setDropListener = data.setDropListener; // Pega a função de drop adicionada
    
    data.preventDefault = properties.prevent_default;

    if (!data.initialized) {
        data.initialized = true;
        let el = document.getElementById(properties.input_id);

        if (el) {
            setListeners(el, properties.disable_autocomplete);
            data.el = el;
        } else {
            const observer = new MutationObserver(() => {
                let el = document.getElementById(properties.input_id);
                if (el) {
                    setListeners(el, properties.disable_autocomplete);
                    data.el = el;
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { subtree: true, childList: true });
        }
    }

    // Adiciona o listener de drop no elemento especificado pelo usuário
    if (properties.drop_id) {
        setDropListener(properties.drop_id);
    }
}
// update:
function(instance, properties, context) {
    const i = instance,
          data = i.data,
          setListeners = data.setListeners,
          setDropListener = data.setDropListener;

    // Atualiza a configuração de `prevent_default` e `disable_autocomplete`
    data.preventDefault = properties.prevent_default;

    // Verifica se o input ID mudou ou se ainda não foi inicializado
    if (data.input_id !== properties.input_id || !data.initialized) {
        data.input_id = properties.input_id;
        data.initialized = true;
        
        // Remove listener anterior se existir
        if (data.el) {
            data.el.removeEventListener('input', data.valueChanged);
            if (data.observer) data.observer.disconnect(); // Desconecta observer anterior
        }

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

    // Adiciona ou redefine o listener de drop se `drop_id` for fornecido e mudar
    if (properties.drop_id && data.drop_id !== properties.drop_id) {
        data.drop_id = properties.drop_id;
        setDropListener(properties.drop_id);
    }
}

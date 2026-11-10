# Modelo YOLO
Coloca aquí `vuela.onnx` (exportado con `yolo export model=best.pt format=onnx imgsz=640 opset=12`).
`labels.json` debe listar los `id` de especie **en el mismo orden que las clases del entrenamiento** (data.yaml `names`).
Sin `vuela.onnx` la app usa el detector falso solo en localhost o con `?mock`; en producción avisa que el modelo no está disponible.

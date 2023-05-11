import { useEffect, useRef, useState } from "react";
import { Box, Grid, Card, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import {
  IDetalheCriacao,
  CriacaoService,
} from "../../shared/services/api/criacao/CriacaoServices";
import { VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import "./Template.css";

interface IFormData {
  id: number;
  y: number;
  x: number;
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  y: yup.number().required(),
  id: yup.number().required(),
  x: yup.number().required(),
});

export const Template: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);

  const cordenadas = useRef<{
    startX: number;
    starty: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    starty: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      cordenadas.current.startX = e.clientX;
      cordenadas.current.starty = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      cordenadas.current.lastX = box.offsetLeft;
      cordenadas.current.lastY = box.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX =
        e.clientX - cordenadas.current.startX + cordenadas.current.lastX;
      const nextY =
        e.clientY - cordenadas.current.starty + cordenadas.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, []);

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      CriacaoService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/create");
        } else {
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        id: "",
        x: "",
        y: "",
      });
    }
  }, [formRef, id, navigate]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados: Omit<IDetalheCriacao, "id">) => {
        setIsLoading(true);

        if (id === "nova") {
          CriacaoService.create(dadosValidados).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/create");
              } else {
                navigate(`/create/detalhe/${result}`);
              }
            }
          });
        } else {
          CriacaoService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/create");
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Realmente deseja apagar?")) {
      CriacaoService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBase
      titulo={id === "nova" ? "Nova pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate("/create")}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/create/detalhe/nova")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            <Box ref={containerRef} className="container">
              <Card ref={boxRef} className="box">
                <Typography className="text">
                  {" "}
                  top: {cordenadas.current.lastY}
                </Typography>
                <Typography className="text">
                  {" "}
                  left: {cordenadas.current.lastX}
                </Typography>
              </Card>
            </Box>
          </Grid>
        </Box>
      </VForm>
    </LayoutBase>
  );
};

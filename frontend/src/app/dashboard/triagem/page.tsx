"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  type GridColDef,
} from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import { getScreenings, type Screening, type RiskLevel } from "@/lib/api";

const riskLabel: Record<RiskLevel, string> = {
  MINIMO: "Mínimo",
  LEVE: "Leve",
  MODERADO: "Moderado",
  MODERADAMENTE_GRAVE: "Mod. Grave",
  GRAVE: "Grave",
};

const riskColor: Record<
  RiskLevel,
  "default" | "success" | "warning" | "error" | "info"
> = {
  MINIMO: "success",
  LEVE: "info",
  MODERADO: "warning",
  MODERADAMENTE_GRAVE: "warning",
  GRAVE: "error",
};

function RiskChip({ level }: { level: RiskLevel }) {
  return <Chip size="small" color={riskColor[level]} label={riskLabel[level]} />;
}

function CustomToolbar({
  onRefresh,
  query,
  setQuery,
}: {
  onRefresh: () => void;
  query: string;
  setQuery: (v: string) => void;
}) {
  return (
    <GridToolbarContainer>
      <Stack direction="row" spacing={2} sx={{ width: "100%", p: 1 }}>
        <TextField
          size="small"
          placeholder="Buscar por aluno, matrícula, curso…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon fontSize="small" /> }}
          sx={{ minWidth: 320 }}
        />
        <Box flex={1} />
        <Tooltip title="Atualizar">
          <IconButton onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </GridToolbarContainer>
  );
}

export default function Page() {
  const [rows, setRows] = useState<Screening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Screening | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const r = await getScreenings(100);
      setRows(r);
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((s) => {
      const st = s.student ?? ({} as any);
      return (
        st.nome?.toLowerCase().includes(q) ||
        st.matricula?.toLowerCase().includes(q) ||
        st.curso?.toLowerCase().includes(q) ||
        st.periodo?.toLowerCase().includes(q) ||
        s.disponibilidade?.toLowerCase().includes(q)
      );
    });
  }, [rows, query]);

  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: "Data",
      width: 170,
      valueGetter: (p) => new Date(p.value as string),
      valueFormatter: (p) =>
        p.value instanceof Date ? p.value.toLocaleString() : "",
      
    },
    {
      field: "nome",
      headerName: "Aluno",
      width: 180,
      valueGetter: (p) => p.row.student?.nome ?? "",
    },
    {
      field: "matricula",
      headerName: "Matrícula",
      width: 160,
      valueGetter: (p) => p.row.student?.matricula ?? "",
    },
    {
      field: "cursoPeriodo",
      headerName: "Curso / Período",
      width: 200,
      valueGetter: (p) =>
        `${p.row.student?.curso ?? ""} • ${p.row.student?.periodo ?? ""}`,
    },
    { field: "phq9Score", headerName: "PHQ-9", width: 90 },
    { field: "gad7Score", headerName: "GAD-7", width: 90 },
    {
      field: "risco",
      headerName: "Risco",
      width: 170,
      renderCell: (p) => (
        <Stack direction="row" spacing={1}>
          <RiskChip level={p.row.riskPHQ9} />
          <RiskChip level={p.row.riskGAD7} />
        </Stack>
      ),
      sortable: false,
      filterable: false,
    },
    { field: "disponibilidade", headerName: "Disponibilidade", width: 170 },
    {
      field: "observacao",
      headerName: "Observação",
      width: 200,
      renderCell: (p) => (
        <Tooltip title={(p.value as string) || ""}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {(p.value as string) ?? ""}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "relatorio",
      headerName: "Relatório",
      width: 120,
      renderCell: (p) => (
        <Tooltip title="Ver relatório completo">
          <IconButton color="primary" onClick={() => setOpen(p.row)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "telegramId",
      headerName: "Telegram ID",
      width: 140,
      valueGetter: (p) => p.row.student?.telegramId ?? "",
    },
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Triagens Recentes
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        sx={{
          height: 560,
          width: "100%",
          "& .MuiDataGrid-columnHeaders": { fontWeight: 700 },
        }}
      >
        <DataGrid
          rows={filtered}
          getRowId={(r) => r.id}
          columns={columns}
          loading={loading}
          disableSelectionOnClick
          components={{
            Toolbar: () => (
              <CustomToolbar onRefresh={load} query={query} setQuery={setQuery} />
            ),
          }}
          initialState={{
            sorting: { sortModel: [{ field: "createdAt", sort: "desc" }] },
            pagination: { pageSize: 10 }, // v5
          }}
          rowsPerPageOptions={[10, 25, 50, 100]} // v5
        />
      </Box>

      {/* Diálogo para o relatório completo */}
      <Dialog open={!!open} onClose={() => setOpen(null)} maxWidth="md" fullWidth>
        <DialogTitle>Relatório da Triagem</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1}>
            <Typography variant="subtitle2">
              Aluno: {open?.student?.nome} • Matrícula: {open?.student?.matricula}
            </Typography>
            <Typography variant="subtitle2">
              PHQ-9: {open?.phq9Score} • GAD-7: {open?.gad7Score} • Risco:{" "}
              {open && `${riskLabel[open.riskPHQ9]} / ${riskLabel[open.riskGAD7]}`}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
              {open?.relatorio}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(null)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
